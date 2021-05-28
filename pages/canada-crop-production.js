import { csv } from 'd3';
import PropsTypes from 'prop-types';

import LineChart from 'components/LineChart/LineChart';
import Layout from 'components/Layout/Layout';

function canadaCropProduction({ data }) {
  return (
    <Layout
      headTitle="Line Chart | Data Visualization"
      title="canada Crop Production"
      subTitle="canada production of different crop types from 1991 to 2020"
      chartType="Line Chart"
      dataSource="Worldwide Crop Production"
      dataSourceUrl="https://www.kaggle.com/vagifa/worldwide-crop-production">
      <LineChart data={data} />
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await csv(
    'https://gist.githubusercontent.com/noctillion/14b33893ebd9d332df34aecfe32fa7a8/raw/157e0ff254df61a293a2212263d09008d09e1ebf/canProduction.csv'
  );




  data.forEach(d => {
    d.time = +d.time;
    d.value = +d.value;
  });

  return {
    props: {
      data,
    },
  };
}

canadaCropProduction.propTypes = {
  data: PropsTypes.array,
};

export default canadaCropProduction;
