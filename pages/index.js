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
import Columns from "components/Columns/Columns";

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
								Drive <em>smart decisions</em> through policy insights and
								economic data analysis on global and regional trends.
							</h1>
						</header>
						<div className={`body`}>
							<p>
								Policy Blueprint & Belo (PB&B) is independent investment
								research, institutional strategy, and political risk advisory
								firm that combines policy and economic analysis to provide
								insight into global and regional trends to inform strategic
								decisions for clients across a number of markets.
							</p>
							<Button href="/call" type="primary">
								Book a Courtesy Call
							</Button>
						</div>
					</Flow>
				</Grid.Col>
			</Grid>

			<Grid>
				<Grid.Col md="grid-start / col-6" className="py-3">
					<Image src="/img/globe.svg" width={512} height={512} />
				</Grid.Col>
				<Grid.Col md="col-7 / grid-end">
					<div className="body f-serif body s-lg">
						<p>
							Our team of policy experts, economists, data scientists, and
							journalists leverage <strong>qualitative</strong> and{" "}
							<strong>quantitative</strong> intelligence,{" "}
							<strong>surveys</strong>, <strong>bespoke research</strong>, and{" "}
							<strong>media monitoring</strong> to deliver tailored support to
							decision-making and investment processes.
						</p>
						<p>
							We provide a unique combination of{" "}
							<strong>in-depth political awareness</strong>, understanding of
							regulatory, and legislative procedures, sectorial stakeholder
							mapping providing clients with a targeted perspective on the
							performance of strategic companies and sectors.
						</p>
						<p>
							Through our research, we answer{" "}
							<strong>high-impact questions</strong> that enable businesses and
							investors to zero in on opportunities relevant to their specific
							market and business needs.
						</p>
					</div>
				</Grid.Col>
			</Grid>

			<Grid>
				<Grid.Col className="my-5 ta-right" md="grid-start / col-7">
					<h2 className="h-2 f-serif">We specialize in:</h2>
				</Grid.Col>
				<Grid.Col className="my-5" md="col-7 / grid-end">
					<div className="body s-lg">
						<ul>
							<li className="my-1">
								Designing strategies for investment funds, corporations, and
								banks Evaluating political, regulatory, and legislative risk
								for, companies listed on{" "}
								<Ticker entry={entries.NYSE} label="NYSE" />
								<Ticker entry={entries.Nasdaq} label="Nasdaq" />,{" "}
								<Ticker entry={entries.Bovespa} label="Bovespa" />, and other
								Latin American stock exchanges
							</li>
							<li className="my-1">
								Providing analysis of key decision-makers, thought leaders to
								help clients anticipate change within target sectors
							</li>
							<li className="my-1">
								Conducting competitor analysis to increase industry/market
								awareness
							</li>
							<li className="my-1">
								Performing comprehensive reputational due diligence to enable
								clients to evaluate risks from M&As or direct investments.
							</li>
						</ul>
					</div>
					<div className="ta-center my-3">
						<Button href="/material" type="primary">
							Request a sample of our work
						</Button>
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
