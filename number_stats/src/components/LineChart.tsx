import React from 'react';
import {Dimensions} from 'react-native';

import {LineChart} from 'react-native-chart-kit';

const LineChartComponent = ({
  dataValues,
  dataLabels,
}: {
  dataValues: number[];
  dataLabels: string[];
}) => {
  const dimensionsValue = Dimensions.get('window');

  return (
    <LineChart
      data={{
        labels: dataLabels,
        datasets: [
          {
            data: dataValues,
          },
        ],
      }}
      width={dimensionsValue.width * 0.8}
      height={dimensionsValue.height * 0.3}
      yAxisLabel=""
      yAxisInterval={1}
      chartConfig={{
        backgroundColor: '#FFFFFF',
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 2,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '1',
          stroke: '#ffa726',
        },
      }}
      bezier
      style={{}}
    />
  );
};
export default LineChartComponent;
