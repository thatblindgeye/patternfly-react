import { cloneElement } from 'react';
import defaults from 'lodash/defaults';
import { Helpers, TextSize } from 'victory-core';
import { ElementPadding } from 'victory-core/src/victory-util/helpers';
import { VictoryLegend } from 'victory-legend';
import { ChartLegendProps } from '../ChartLegend/ChartLegend';
import { ChartCommonStyles } from '../ChartTheme/ChartStyles';
import { ChartThemeDefinition } from '../ChartTheme/ChartTheme';
import { getLabelTextSize } from '../ChartUtils/chart-label';
import { getPieOrigin } from './chart-origin';
interface ChartLegendInterface {
  allowWrap?: boolean; // Allow legend items to wrap to the next line
  chartType?: string; // The type of chart (e.g., pie) to lookup for props
  colorScale?: any; // The color scale that will be applied to the chart
  dx?: number; // Horizontal shift from the x coordinate
  dy?: number; // Vertical shift from the x coordinate
  height: number; // Overall height of SVG
  legendComponent: React.ReactElement<any>; // The base legend component to render
  orientation?: 'horizontal' | 'vertical'; // Orientation of legend
  padding: ElementPadding; // Chart padding
  patternScale?: string[]; // Legend symbol patterns
  position: 'bottom' | 'bottom-left' | 'right'; // The legend position
  theme: ChartThemeDefinition; // The theme that will be applied to the chart
  themeColor?: string; // The theme color that will be applied to the chart
  width: number; // Overall width of SVG
}

interface ChartLegendDimensionsInterface {
  legendData: any[]; // The legend data used to determine width
  legendOrientation: 'horizontal' | 'vertical'; // Orientation of legend
  legendProps: ChartLegendProps; // Legend properties
  theme: ChartThemeDefinition; // The theme that will be applied to the chart
}

interface ChartLegendPositionInterface {
  chartType?: string; // The type of chart (e.g., pie) to lookup for props
  dx?: number; // Horizontal shift from the x coordinate
  dy?: number; // Vertical shift from the x coordinate
  height?: number; // Overall height of SVG
  legendData: any[]; // The legend data used to determine width
  legendOrientation: 'horizontal' | 'vertical'; // Orientation of legend
  legendPosition: 'bottom' | 'bottom-left' | 'right'; // Position of legend
  legendProps: any; // The legend props used to determine width
  padding?: ElementPadding; // Chart padding
  theme: ChartThemeDefinition; // The theme that will be applied to the chart
  width?: number; // Overall width of SVG
}

interface ChartLegendTextMaxSizeInterface {
  legendData: any[]; // The legend data used to determine width
  theme: ChartThemeDefinition; // The theme that will be applied to the chart
}

/**
 * Returns the max text length in a legend data set to calculate the x offset for right aligned legends.
 *
 * @private Not intended as public API and subject to change
 */
export const getLegendMaxTextWidth = (legendData: any[], theme: ChartThemeDefinition) => {
  let legendXOffset = 0;
  legendData.map((data: any) => {
    const labelWidth = getLabelTextSize({ text: data.name, theme }).width;
    if (labelWidth > legendXOffset) {
      legendXOffset = labelWidth;
    }
  });
  return legendXOffset;
};

/**
 * Returns a legend which has been positioned per the given chart properties
 *
 * @private Not intended as public API and subject to change
 */
export const getComputedLegend = ({
  allowWrap = true,
  chartType = 'chart',
  colorScale,
  dx = 0,
  dy = 0,
  height,
  legendComponent,
  padding,
  patternScale,
  position = ChartCommonStyles.legend.position,
  theme,
  themeColor,
  width,

  // destructure last
  orientation = theme.legend.orientation as any
}: ChartLegendInterface) => {
  // Get the number of legend items per row
  const legendItemsProps = legendComponent.props ? legendComponent.props : {};
  const legendItemsPerRow = allowWrap
    ? getLegendItemsPerRow({
        dx,
        height,
        legendData: legendItemsProps.data,
        legendOrientation: legendItemsProps.legendOrientation ? legendItemsProps.legendOrientation : orientation,
        legendPosition: position,
        legendProps: legendItemsProps,
        padding,
        theme,
        width
      })
    : undefined;

  // Include new itemsPerRow prop when determining x and y position
  const legendPositionProps = defaults({}, legendComponent.props, {
    itemsPerRow: legendItemsPerRow
  });

  const legendX = getLegendX({
    chartType,
    dx,
    height,
    legendData: legendPositionProps.data,
    legendOrientation: legendPositionProps.legendOrientation ? legendPositionProps.legendOrientation : orientation,
    legendPosition: position,
    legendProps: legendPositionProps,
    padding,
    theme,
    width
  });

  const legendY = getLegendY({
    chartType,
    dy,
    height,
    legendData: legendPositionProps.data,
    legendOrientation: legendPositionProps.legendOrientation ? legendPositionProps.legendOrientation : orientation,
    legendProps: legendPositionProps,
    legendPosition: position,
    padding,
    theme,
    width
  });

  // Clone legend with updated props
  const legendProps = defaults({}, legendComponent.props, {
    colorScale,
    itemsPerRow: legendItemsPerRow,
    orientation,
    patternScale,
    standalone: false,
    theme,
    themeColor,
    x: legendX > 0 ? legendX : 0,
    y: legendY > 0 ? legendY : 0
  });
  return cloneElement(legendComponent, legendProps);
};

/**
 * Returns legend dimensions
 *
 * @private Not intended as public API and subject to change
 */
export const getLegendDimensions = ({
  legendData,
  legendOrientation,
  legendProps,
  theme
}: ChartLegendDimensionsInterface) => {
  if (legendData || legendProps.data) {
    return (VictoryLegend as any).getDimensions({
      data: legendData,
      orientation: legendOrientation,
      theme,
      ...legendProps // override above
    });
  }
  return {};
};

/**
 * Returns true if the legend is smaller than its container
 *
 * @private Not intended as public API and subject to change
 */
const doesLegendFit = ({
  dx = 0,
  height,
  legendPosition,
  legendData,
  legendOrientation,
  legendProps,
  padding,
  theme,
  width
}: ChartLegendPositionInterface) => {
  const { left, right } = Helpers.getPadding(padding);
  const chartSize = {
    height, // Fixed size
    width: width - left - right
  };
  const legendDimensions = getLegendDimensions({
    legendData,
    legendOrientation,
    legendProps,
    theme
  });

  let occupiedWidth = 0;
  switch (legendPosition) {
    case 'bottom-left':
      occupiedWidth = left + dx;
      break;
    case 'right':
      occupiedWidth = chartSize.width + ChartCommonStyles.legend.margin + left + dx;
      break;
    default:
      occupiedWidth = dx;
      break;
  }
  return width - occupiedWidth > legendDimensions.width;
};

/**
 * Returns the number of legend items per row
 *
 * @private Not intended as public API and subject to change
 */
const getLegendItemsPerRow = ({
  dx,
  height,
  legendPosition,
  legendData,
  legendOrientation,
  legendProps,
  padding,
  theme,
  width
}: ChartLegendPositionInterface) => {
  let itemsPerRow = legendData ? legendData.length : 0;
  for (let i = itemsPerRow; i > 0; i--) {
    const fits = doesLegendFit({
      dx,
      height,
      legendPosition,
      legendData,
      legendOrientation,
      legendProps: {
        ...legendProps,
        itemsPerRow: i
      },
      padding,
      theme,
      width
    });
    if (fits) {
      itemsPerRow = i;
      break;
    }
  }
  return itemsPerRow;
};

/**
 * Returns the extra height required to accommodate wrapped legend items
 *
 * @private Not intended as public API and subject to change
 */
export const getLegendItemsExtraHeight = ({
  legendData,
  legendOrientation,
  legendProps,
  theme
}: ChartLegendDimensionsInterface) => {
  // Get legend dimensions
  const legendDimensions = getLegendDimensions({
    legendData,
    legendOrientation,
    legendProps,
    theme
  });

  // Get legend dimensions without any wrapped items
  const legendDimensionsNoWrap = getLegendDimensions({
    legendData,
    legendOrientation,
    legendProps: {
      ...legendProps,
      itemsPerRow: undefined
    },
    theme
  });

  return Math.abs(legendDimensions.height - legendDimensionsNoWrap.height);
};

/**
 * Returns x coordinate for legend
 *
 * @private Not intended as public API and subject to change
 */
const getLegendX = ({ chartType, ...rest }: ChartLegendPositionInterface) =>
  chartType === 'pie' ? getPieLegendX(rest) : getChartLegendX(rest);

/**
 * Returns y coordinate for legend
 *
 * @private Not intended as public API and subject to change
 */
const getLegendY = ({ chartType, ...rest }: ChartLegendPositionInterface) => {
  switch (chartType) {
    case 'pie':
      return getPieLegendY(rest);
    case 'bullet':
      return getBulletLegendY(rest);
    default:
      return getChartLegendY(rest);
  }
};

/**
 * Returns y coordinate for bullet legends
 *
 * @private Not intended as public API and subject to change
 */
const getBulletLegendY = ({
  dy = 0,
  height,
  legendPosition,
  legendData,
  legendOrientation,
  legendProps,
  padding,
  theme,
  width
}: ChartLegendPositionInterface) => {
  const { left, right } = Helpers.getPadding(padding);
  const chartSize = {
    height, // Fixed size
    width: width - left - right
  };

  switch (legendPosition) {
    case 'bottom':
    case 'bottom-left':
      return chartSize.height + ChartCommonStyles.legend.margin + dy;
    case 'right': {
      // Legend height with padding
      const legendDimensions = getLegendDimensions({
        legendData,
        legendOrientation,
        legendProps,
        theme
      });
      const legendPadding = (legendDataArr: any[]) => (legendDataArr && legendDataArr.length > 0 ? 17 : 0);
      return (chartSize.height - legendDimensions.height) / 2 + legendPadding(legendData);
    }
    default:
      return dy;
  }
};

/**
 * Returns x coordinate for chart legends
 *
 * @private Not intended as public API and subject to change
 */
const getChartLegendX = ({
  dx = 0,
  height,
  legendData,
  legendOrientation,
  legendPosition,
  legendProps,
  padding,
  theme,
  width
}: ChartLegendPositionInterface) => {
  const { top, bottom, left, right } = Helpers.getPadding(padding);
  const chartSize = {
    height: Math.abs(height - (bottom + top)),
    width: Math.abs(width - (left + right))
  };
  const legendDimensions = getLegendDimensions({
    legendData,
    legendOrientation,
    legendProps,
    theme
  });

  switch (legendPosition) {
    case 'bottom':
      return width > legendDimensions.width ? Math.round((width - legendDimensions.width) / 2) + dx : dx;
    case 'bottom-left':
      return left + dx;
    case 'right':
      return chartSize.width + ChartCommonStyles.legend.margin + left + dx;
    default:
      return dx;
  }
};

/**
 * Returns y coordinate for chart legends
 *
 * @private Not intended as public API and subject to change
 */
const getChartLegendY = ({
  dy = 0,
  height,
  legendPosition,
  legendData,
  legendOrientation,
  legendProps,
  padding,
  theme,
  width
}: ChartLegendPositionInterface) => {
  const { top, bottom, left, right } = Helpers.getPadding(padding);
  const chartSize = {
    height: Math.abs(height - (bottom + top)),
    width: Math.abs(width - (left + right))
  };

  switch (legendPosition) {
    case 'bottom':
    case 'bottom-left':
      return chartSize.height + ChartCommonStyles.legend.margin * 2 + top + dy;
    case 'right': {
      // Legend height with padding
      const legendDimensions = getLegendDimensions({
        legendData,
        legendOrientation,
        legendProps,
        theme
      });
      const originX = chartSize.height / 2 + top;
      const legendPadding = (legendDataArr: any[]) => (legendDataArr && legendDataArr.length > 0 ? 2 : 0);
      return originX - legendDimensions.height / 2 + legendPadding(legendData);
    }
    default:
      return dy;
  }
};

/**
 * Returns x coordinate for pie legends
 *
 * @private Not intended as public API and subject to change
 */
const getPieLegendX = ({
  dx = 0,
  height,
  legendData,
  legendOrientation,
  legendPosition,
  legendProps,
  padding,
  theme,
  width
}: ChartLegendPositionInterface) => {
  const origin = getPieOrigin({ height, padding, width });
  const radius = Helpers.getRadius({ height, width, padding });
  const legendDimensions = getLegendDimensions({
    legendData,
    legendOrientation,
    legendProps,
    theme
  });

  switch (legendPosition) {
    case 'bottom':
      return width > legendDimensions.width ? Math.round((width - legendDimensions.width) / 2) + dx : dx;
    case 'right':
      return origin.x + ChartCommonStyles.label.margin + dx + radius;
    default:
      return dx;
  }
};

/**
 * Returns y coordinate for pie legends
 *
 * @private Not intended as public API and subject to change
 */
const getPieLegendY = ({
  dy = 0,
  height,
  legendPosition,
  legendData,
  legendOrientation,
  legendProps,
  padding,
  theme,
  width
}: ChartLegendPositionInterface) => {
  const origin = getPieOrigin({ height, padding, width });
  const radius = Helpers.getRadius({ height, width, padding });

  switch (legendPosition) {
    case 'bottom':
      return origin.y + ChartCommonStyles.legend.margin + radius + dy;
    case 'right': {
      // Legend height with padding
      const legendDimensions = getLegendDimensions({
        legendData,
        legendOrientation,
        legendProps,
        theme
      });
      const legendPadding = (legendDataArr: any[]) => (legendDataArr && legendDataArr.length > 0 ? 2 : 0);
      return origin.y - legendDimensions.height / 2 + legendPadding(legendData);
    }
    default:
      return dy;
  }
};

/**
 * Returns an approximation of longest text width based on legend styles
 *
 * @private Not intended as public API and subject to change
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getMaxLegendTextSize = ({ legendData, theme }: ChartLegendTextMaxSizeInterface) => {
  const style: any = theme && theme.legend && theme.legend.style ? theme.legend.style.labels : undefined;
  if (!(legendData && legendData.length)) {
    return 0;
  }

  let result = '';
  legendData.forEach((data) => {
    if (data.name && data.name.length > result.length) {
      result = data.name;
    }
  });

  // The approximateTextSize function returns height and width, but Victory incorrectly typed it as number
  const adjustedTextSize: any = TextSize.approximateTextSize(result, {
    ...style
  });

  return adjustedTextSize.width;
};
