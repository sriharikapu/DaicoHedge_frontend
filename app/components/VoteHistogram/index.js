import React from 'react';
import ReactEcharts from 'echarts-for-react';

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

const getOption = voteHistogramData => {
  const binRanges = [];
  const binValues = [];
  for (const property in voteHistogramData) {
    const element = voteHistogramData[property];
    binRanges.push(`${element.min}%-${element.max}%`);
    binValues.push(element.voters);
  }

  console.log('histogr', binRanges, binValues);
  return {
    // tooltip: {
    //     trigger: 'none',
    //     axisPointer: {
    //         type: 'cross'
    //     }
    // },
    color: ['#4ca9fc'],
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisPointer: {
          show: true,
          label: {
            width: '100%',
            padding: [5, 60, 5, 60],
            textStyle: { fontFamily: 'Montserrat', fontSize: '14' },
            formatter(params) {
              return `No. of voters with vote share in ${params.value}${
                params.seriesData.length ? `：${params.seriesData[0].data}` : ''
              }`;
            }
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: '#3d3d3d'
          }
        },
        axisLabel: {
          show: false
        },
        data: binRanges
      },
      {
        type: 'category',
        boundaryGap: false,
        axisPointer: {
          show: false
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: '#3d3d3d'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        data: binRanges
      }
    ],
    yAxis: [
      {
        max: Math.max(...binValues) * 1.2,
        type: 'value',
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#3d3d3d'
          }
        }
      },
      {
        max: Math.max(...binValues) * 1.2,
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#3d3d3d'
          }
        }
      }
    ],
    grid: {
      top: 80,
      bottom: 40,
      left: 0,
      right: 5
    },
    series: [
      {
        data: binValues,
        smooth: true,
        type: 'line',
        lineStyle: {
          width: 3
        },
        markLine: {
          data: [
            {
              type: 'max',
              name: 'Frequency',
              label: {
                textStyle: { fontFamily: 'Montserrat' },
                position: 'middle',
                formatter(params) {
                  return `${params.name}: ${params.value} Voter`;
                }
              }
            }
          ]
        },
        areaStyle: {
          shadowBlur: 0,
          opacity: 0.3
        }
      }
    ]
  };
};

const VoteHistogram = props => {
  const { voteHistogramData, totalVotes, collectiveVoteWeight, projectHealth } =
    props || {};
  return (
    <div>
      <div className="txt-xxxl text--primary">Vote Histogram</div>
      <ReactEcharts
        option={getOption(voteHistogramData)}
        notMerge
        lazyUpdate
        style={{ height: '25em', width: '30em', padding: '0px' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
};

export default VoteHistogram;
