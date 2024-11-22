import * as React from "react";

import Bar from "../Bar";
import Arrow from "../Arrow";
import Footer from "../Footer";

import "./index.less";
import {
  API_URL,
  ARROW_X_OFFSET,
  ARROW_Y_OFFSET,
  BAR_ARROW_OFFSET,
} from "../constants.js";

interface EnvironmentStats {
  front: number;
  back: number;
  db: number;
}

interface ServerData {
  title: string;
  dev: EnvironmentStats;
  test: EnvironmentStats;
  prod: EnvironmentStats;
  norm: number;
}

const TestsPassed = (): JSX.Element => {
  const [serverStats, setServerStats] = React.useState<ServerData>(null);
  const [selectedServer, setSelectedServer] = React.useState("1");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const devRef = React.useRef(null);
  const testRef = React.useRef(null);
  const prodRef = React.useRef(null);
  const [maxBarHeight, setMaxBarHeight] = React.useState(0);
  const [devBarPosition, setDevBarPosition] = React.useState({
    x: 0,
    y: 0,
  });
  const [testBarPosition, setTestBarPosition] = React.useState({
    x: 0,
    y: 0,
  });
  const [prodBarPosition, setProdBarPosition] = React.useState({
    x: 0,
    y: 0,
  });

  const handleServerChange = (event) => {
    setSelectedServer(event.target.value);
  };

  const servers = ["1", "2", "3", "4", "5"];

  const sum = (arr: number[]): number => {
    return arr.reduce((partialSum, a) => partialSum + a, 0);
  };

  const testDevDiff = () => {
    return (
      sum(Object.values(serverStats.test)) - sum(Object.values(serverStats.dev))
    );
  };

  const prodTestDiff = () => {
    return (
      sum(Object.values(serverStats.prod)) -
      sum(Object.values(serverStats.test))
    );
  };

  const updatePositions = () => {
    const devRect = devRef.current?.getBoundingClientRect();
    const testRect = testRef.current?.getBoundingClientRect();
    const prodRect = prodRef.current?.getBoundingClientRect();

    if (devRect) {
      setDevBarPosition({
        x: devRect.x + devRect.width / 2,
        y: devRect.y - ARROW_Y_OFFSET,
      });
    }
    if (testRect) {
      setTestBarPosition({
        x: testRect.x + testRect.width / 2,
        y: testRect.y - ARROW_Y_OFFSET,
      });
    }
    if (prodRect) {
      setProdBarPosition({
        x: prodRect.x + prodRect.width / 2,
        y: prodRect.y - ARROW_Y_OFFSET,
      });
    }
    if (devRect && testRect && prodRect) {
      setMaxBarHeight(
        Math.min(devRect.y, testRect.y, prodRect.y) - BAR_ARROW_OFFSET,
      );
    }
  };

  React.useEffect(() => {
    if (selectedServer) {
      setLoading(true);
      setError(null);

      const fetchServerData = async () => {
        try {
          const response = await fetch(`${API_URL}ttrp${selectedServer}.json`);
          const data = await response.json();
          setServerStats(data);
        } catch (error) {
          setError("Failed to fetch data");
        } finally {
          setLoading(false);
          const resizeEvent = new Event("resize");

          window.dispatchEvent(resizeEvent);
        }
      };

      fetchServerData();
    }
  }, [selectedServer]);

  React.useEffect(() => {
    updatePositions();

    window.addEventListener("resize", updatePositions);

    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  return (
    <>
      <div className="tests-container">
        <div className="tests-container__header">
          {serverStats && (
            <span>Количество пройденных тестов "{serverStats.title}"</span>
          )}
          <div className="tests-container__header--last">
            <select onChange={handleServerChange} value={selectedServer}>
              {servers.map((server, index) => (
                <option key={index} value={server}>
                  Server {server}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="tests-container__content">
          {loading && <h1>Loading...</h1>}

          {error && <h1>{error}</h1>}

          {serverStats && (
            <>
              <Bar
                heights={Object.values(serverStats.dev)}
                label="dev"
                ref={devRef}
                isStandard={false}
              />
              <Arrow
                start={devBarPosition}
                finish={{
                  ...testBarPosition,
                  x: testBarPosition.x - ARROW_X_OFFSET,
                }}
                height={maxBarHeight}
                diff={testDevDiff()}
              />
              <Bar
                heights={Object.values(serverStats.test)}
                label="test"
                ref={testRef}
                isStandard={false}
              />
              <Arrow
                start={{
                  ...testBarPosition,
                  x: testBarPosition.x + ARROW_X_OFFSET,
                }}
                finish={prodBarPosition}
                height={maxBarHeight}
                diff={prodTestDiff()}
              />
              <Bar
                heights={Object.values(serverStats.prod)}
                label="prod"
                ref={prodRef}
                isStandard={false}
              />
              <Bar
                heights={[serverStats.norm]}
                label="норматив"
                isStandard={true}
              />
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default TestsPassed;
