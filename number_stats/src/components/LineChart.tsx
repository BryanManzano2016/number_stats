import React from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import {Circle, Text} from 'react-native-svg';

import {LineChart} from 'react-native-chart-kit';
import {WIDTH_MAX_RECORDS, WIDTH_RECORD} from '../utils/Constants';
import styles from '../styles/Main';

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
  const widthChart =
    dataLength < WIDTH_MAX_RECORDS
      ? dimensionsValue.width
      : WIDTH_RECORD * dataLength;

  try {
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
            style: {},
            propsForDots: {
              r: '6',
              strokeWidth: '1',
              stroke: '#ffa726',
            },
          }}
          bezier
          verticalLabelRotation={configuration.verticalLabelRotation}
          style={styles.lineChart}
          onDataPointClick={() => {}}
          renderDotContent={({x, y, index, indexData}) => {
            return (
              <View key={'renderDotContent' + index}>
                <Circle cx={x} cy={y} r={5} fill="gray" />
                <Text
                  x={x + 20}
                  y={y - 5}
                  fontSize={11}
                  fill="black"
                  textAnchor="middle">
                  {indexData}
                </Text>
              </View>
            );
          }}
        />
      </ScrollView>
    );
  } catch (error) {
    console.log('Error LineChartComponent', error);
    return <></>;
  }
};
export default LineChartComponent;
