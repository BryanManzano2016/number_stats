import React from 'react';
import {Dimensions, ScrollView} from 'react-native';

import {LineChart} from 'react-native-chart-kit';

const LineChartComponent = ({
  dataValues,
  dataLabels,
  configuration,
}: {
  dataValues: number[];
  dataLabels: string[];
  configuration: {heightProportional: number; verticalLabelRotation: number};
}) => {
  const dimensionsValue = Dimensions.get('window');
  const dataLength = dataValues.length;
  const widthChart = dataLength < 12 ? dimensionsValue.width : 25 * dataLength;

  return (
    <ScrollView horizontal>
      <LineChart
        data={{
          labels: dataLabels,
          datasets: [
            {
              data: dataValues,
            },
          ],
        }}
        width={widthChart}
        height={dimensionsValue.height * configuration.heightProportional}
        yAxisLabel=""
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#FFFFFF',
          backgroundGradientFrom: '#FFFFFF',
          backgroundGradientTo: '#FFFFFF',
          decimalPlaces: 2,
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
        verticalLabelRotation={configuration.verticalLabelRotation}
        style={{}}
      />
    </ScrollView>
  );
};
export default LineChartComponent;
