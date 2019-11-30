import React from 'react';
import timerFormat from "../utils/timerFormat";
import { ResponsivePie } from '@nivo/pie'

function Statistic(props) {
  const { title, data, donut } = props;
  const innerRadius = donut ? 0.5 : 0;

  function sliceLabel(data) {
    if (data.value > 0 && title === "Time") return timerFormat(data.value, "hh:mm");
    if (data.value > 0) return data.value;
  }

  function total(data) {
    const total = data.reduce((acc, item) => acc += item.value, 0);

    if (title === "Time") return timerFormat(total, "hh:mm:ss");

    return total;
  }

  return (
    <div className="statistic">
      <span className="title">{title}</span>
      <div className="content">
        <div className="total">
          <span>Total</span>
          <span>{total(data)}</span>
        </div>
        <div className="chart">
          {data.every(d => d.value === 0) ? (
            <ResponsivePie
              data={[{"id": "empty", "label": "empty", "value": 1}]}
              innerRadius={innerRadius}
              enableRadialLabels={false}
              enableSlicesLabels={false}
              isInteractive={false}
              colors={["#ccc"]} />
          ) : (
            <ResponsivePie
              data={data}
              innerRadius={innerRadius}
              enableRadialLabels={false}
              sliceLabel={sliceLabel}
              slicesLabelsTextColor="#fff"
              colors={["#88ba6a", "#fc6a6a"]} />
          )}
        </div>
      </div>

      <style jsx>{`
        .statistic {
          width: 100%;
          border: 1px solid #ccc;
          padding: 1rem;
          box-sizing: border-box;
        }
        .statistic > .content {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
        }
        .statistic > .title {
          display: block;
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        .statistic .total {
          font-size: 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
        }
        .statistic .total > *:last-child {
          font-size: 26px;
        }
        .statistic .chart {
          height: 90px;
          max-width: 90px;
          width: 50%;
        }
      `}</style>
    </div>
  );
}

export default Statistic;
