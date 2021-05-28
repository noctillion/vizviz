import Head from 'next/head';
import { csv, json } from 'd3';
import { feature } from 'topojson';
import PropsTypes from 'prop-types';

import BubbleMap from 'components/BubbleMap/BubbleMap';
import Layout from 'components/Layout/Layout';

function Covid19Dashboard({ countries }) {
  return (
    <Layout
      headTitle="Bubble Map | Data Visualization"
      title="WHO Covid-19 World Dashboard"
      subTitle="January 2nd 2021"
      chartType="Bubble Map"
      dataSource="WHO Coronavirus Disease (COVID-19) Dashboard"
      dataSourceUrl="https://covid19.who.int/">
      <BubbleMap countries={countries} />
    </Layout>
  );
}

export async function getStaticProps() {
  const TOPO_JSON_DATA =
    'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';
  const COVID_DATA =
    'https://gist.githubusercontent.com/noctillion/14b33893ebd9d332df34aecfe32fa7a8/raw/b935db619449195355455d90544659a70a8151a3/covidfile.txt';

  const covidData = await csv(COVID_DATA);
  const topoData = await json(TOPO_JSON_DATA);
  const countries = await feature(topoData, topoData.objects.countries);

  const rowByName = await covidData.reduce((accumulator, d) => {
    accumulator[d['country']] = d;
    return accumulator;
  }, {});

  await countries.features.forEach(d => {
    Object.assign(d.properties, rowByName[d.properties.name]);
  });

  return {
    props: {
      countries,
    },
  };
}

Covid19Dashboard.propTypes = {
  countries: PropsTypes.object,
};

export default Covid19Dashboard;
