import Layout from "components/Layout/Layout";
import Meta from "components/Meta/Meta";
import { client } from "utils/prismic.js";
import menuQuery from "gql/menu";
import Grid from "components/Grid/Grid";
import Flow from "components/Flow/Flow";
import Particles from "components/Particles/Particles";
import Image from "next/image";
import Button from "components/Button/Button";
import Ticker from "components/Ticker/Ticker";
import useSWR from "swr";
import { useState, useEffect } from "react";

export default function Home({ menu }) {
	const fetcher = (url) => fetch(url).then((r) => r.json());
	const { data, error } = useSWR("/api/market", fetcher, {
		refreshInterval: 60000,
	});
	const [entries, setEntries] = useState({});

	useEffect(() => {
		if (data && data.stocks) {
			setEntries({
				NYSE: data.stocks.filter((stock) => stock.symbol === "^NYA")[0],
				Nasdaq: data.stocks.filter((stock) => stock.symbol === "^IXIC")[0],
				Bovespa: data.stocks.filter((stock) => stock.symbol === "^BVSP")[0],
			});
		}
	}, [data]);

	return (
		<Layout>
			<Meta />
			<Grid>
				<Grid.Col rowSm="1" sm="screen-start / screen-end">
					<div
						style={{
							position: "relative",
							overflow: "hidden",
							height: "100%",
							width: "100%",
						}}
					>
						<Particles />
					</div>
				</Grid.Col>
				<Grid.Col rowSm="1" md="col-2 / span 8" className="py-5">
					<Flow>
						<header>
							<p className="smcp l-2">Designed for investors</p>
							<h1 className="h-1">
								Combining policy insight and economic data to analyze global and
								regional trends.
							</h1>
						</header>
						<div className={`body`}>
							<p>
								Policy Blueprint & Belo is an independent investment research,
								institutional strategy and political risk advisory firm, that
								combines economic data and policy insight to analyze global and
								regional trends in support of investment decisions for clients
								across a number of markets.
							</p>
							<Button href="/call" type="primary">
								Book a Courtesy Call
							</Button>
						</div>
					</Flow>
				</Grid.Col>
			</Grid>

			<Grid container>
				<Grid.Col md="grid-start / col-6">
					<Image src="/img/globe.svg" width={512} height={512} />
				</Grid.Col>
				<Grid.Col md="col-7 / grid-end">
					<div className="body f-serif body s-lg">
						<p>
							PB&B’s team of policy experts, economists, data scientists and
							journalists utilize <strong>qualitative</strong> and{" "}
							<strong>quantitative</strong> intelligence,{" "}
							<strong>surveys</strong>, <strong>bespoke research</strong>, and{" "}
							<strong>media monitoring</strong> to deliver tailored support to
							the investment process.
						</p>
						<p>
							Our research allows analysts and portfolio managers to{" "}
							<strong>focus on opportunities</strong> relevant to their specific
							market and business needs.
						</p>
						<p>
							By means of <strong>original and unbiased research</strong>, PB&B
							provides data-driven evidence to answer the difficult and high
							impact questions that ultimately drive securities prices.
						</p>
					</div>
				</Grid.Col>
			</Grid>

			<Grid container>
				<Grid.Col className="my-3" md="col-4 / span 6">
					<div className="body">
						<p>
							The firm also specializes in the design of strategies for
							investment funds, corporations and banks and the evaluation of
							political, regulatory and legislative risk for companies listed on
							the <Ticker entry={entries.NYSE} label="NYSE" />,{" "}
							<Ticker entry={entries.Nasdaq} label="Nasdaq" />,{" "}
							<Ticker entry={entries.Bovespa} label="Bovespa" /> and other Latin
							American stock exchanges.
						</p>
						<p>
							PB&B leverages direct and indirect interactions with local
							governments, regulatory agencies and Congress to identify factors
							that can influence the future performance of targeted companies.
							In-depth analysis of key decision makers, opinion makers,
							competitors and local policies allow PB&B to anticipate potential
							impacts on companies and sectors.
						</p>
						<p>
							Our reports and strategies are tailor-made and timely delivered to
							support the decision-making of investors. PB&B expertise in
							performing reputational due diligence is also an asset used by
							institutions to evaluate risks related to M&A and/or direct
							investments. The unique combination of in-depth political
							awareness, understanding of regulatory and legislative procedures,
							sectorial stakeholder mapping and identification of trends offers
							the client a unique perspective on the performance of strategic
							companies and sectors.
						</p>
						<div className="ta-center">
							<Button href="/material" type="primary">
								Request a sample of our work
							</Button>
						</div>
					</div>
				</Grid.Col>
			</Grid>
		</Layout>
	);
}

export async function getStaticProps({ locale }) {
	const { data } = await client.query({
		query: menuQuery,
	});

	if (data)
		return {
			props: {
				menu: data.allHomes.edges[0].node.body,
			},
		};

	return { props: { menu: {} } };
}
