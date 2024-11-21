import * as React from "react";

import Bar from "../Bar";
import Arrow from "../Arrow";
import Footer from "../Footer";

import "./index.less";
import { API_URL } from "../constants.js";

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
  const [devPositions, setDevPositions] = React.useState({
    x: 0,
    y: 0,
  });
  const [testPositions, setTestPositions] = React.useState({
    x: 0,
    y: 0,
  });
  const [prodPositions, setProdPositions] = React.useState({
    x: 0,
    y: 0,
  });

  const handleServerChange = (event) => {
    setSelectedServer(event.target.value);
  };

  const servers = ["1", "2", "3", "4", "5"];

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
        }
      };

      fetchServerData();
    }
  }, [selectedServer]);

  React.useEffect(() => {
    const updatePositions = () => {
      const devRect = devRef.current?.getBoundingClientRect();
      const testRect = testRef.current?.getBoundingClientRect();
      const prodRect = prodRef.current?.getBoundingClientRect();

      if (devRect) {
        setDevPositions({
          x: devRect.x + devRect.width / 2,
          y: devRect.y - 10,
        });
      }
      if (testRect) {
        setTestPositions({
          x: testRect.x + testRect.width / 2,
          y: testRect.y - 10,
        });
      }
      if (prodRect) {
        setProdPositions({
          x: prodRect.x + prodRect.width / 2,
          y: prodRect.y - 10,
        });
      }
    };

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
          <div>
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
              />
              <Arrow
                start={devPositions}
                finish={{ ...testPositions, x: testPositions.x - 10 }}
              />
              <Bar
                heights={Object.values(serverStats.test)}
                label="test"
                ref={testRef}
              />
              <Arrow
                start={{ ...testPositions, x: testPositions.x + 10 }}
                finish={prodPositions}
              />
              <Bar
                heights={Object.values(serverStats.prod)}
                label="prod"
                ref={prodRef}
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
