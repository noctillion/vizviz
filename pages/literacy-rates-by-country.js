import { csv } from 'd3';
import PropsTypes from 'prop-types';

import Layout from 'components/Layout/Layout';
import ScatterPlot from 'components/ScatterPlot/ScatterPlot';

function LiteracyRatesByContry({ data }) {
  return (
    <Layout
      headTitle="Scatter Plot | Data Visualization"
      title="Literacy Rates By Country 2015"
      subTitle="The younger vs The older generation"
      chartType="Scatter Plot"
      dataSource="Our World in Data"
      dataSourceUrl="https://ourworldindata.org/literacy">
      <ScatterPlot data={data} />
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await csv(
    'https://gist.githubusercontent.com/noctillion/14b33893ebd9d332df34aecfe32fa7a8/raw/b935db619449195355455d90544659a70a8151a3/elder.csv'
  );

  data.forEach(d => {
    d.youthRate = +d.youthRate;
    d.elderlyRate = +d.elderlyRate;
  });

  return {
    props: {
      data,
    },
  };
}

LiteracyRatesByContry.propTypes = {
  data: PropsTypes.array,
};

export default LiteracyRatesByContry;
