import React, { memo, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ setTooltipContent, node_data }) => {
  const markers = [];
  const country_count = {};
  let max = 0;

  if (node_data)
    for (let i = 0; i < node_data.length; i++) {
      let node = node_data[i];
      if (!country_count[node.geo_data.country])
        country_count[node.geo_data.country] = 0;
      country_count[node.geo_data.country] += 1;
      if (country_count[node.geo_data.country] > max)
        max = country_count[node.geo_data.country];
      markers.push(
        <Marker
          key={"marker" + i}
          onMouseEnter={() => {
            setTooltipContent(
              <>
                {`Address: ${node.xdc_address}`}
                <br />
                {`Reputation: ${node.reputation}`}
              </>
            );
          }}
          onMouseLeave={() => {
            setTooltipContent("");
          }}
          coordinates={[node.coordinates[1], node.coordinates[0]]}
        >
          <circle r={8} fill="#F53" />
        </Marker>
      );
    }

  console.log("country_count", country_count);

  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const count = country_count[geo.properties.ISO_A2] || 0;
                const count_percent =
                  Math.round(0.75 * 100 * (count / max)) + 25;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { NAME } = geo.properties;
                      setTooltipContent(
                        <>
                          {`Country: ${NAME}`}
                          <br />
                          {`Count: ${count}`}
                        </>
                      );
                    }}
                    className={`opacity-${count_percent}`}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                  />
                );
              })
            }
          </Geographies>
          {markers}
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

const MapChartMemo = memo(MapChart);

function WorldMap({ data }) {
  const [content, setContent] = useState("");
  return (
    <div className="world-map">
      <MapChartMemo node_data={data} setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default WorldMap;
