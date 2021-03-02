import Layout from "components/Layout/Layout";
import Meta from "components/Meta/Meta";
import Grid from "components/Grid/Grid";
import ContactForm from "components/ContactForm/ContactForm";
import Image from "next/image";
import Flow from "components/Flow/Flow";

const CallPage = () => {
	return (
		<Layout>
			<Meta />
			<Grid className="py-3">
				<Grid.Col md="screen-start / col-7">
					<Image
						src="https://images.prismic.io/pbnb/bdda152e-de85-4728-9ab1-2bcf31fbda45_sample-material.png?auto=compress,format"
						width={2678}
						height={1503}
						layout="responsive"
					/>
				</Grid.Col>
				<Grid.Col md="col-7 / grid-end">
					<Flow spacing="2rem">
						<h1 className="h-2">Request Sample Material</h1>
						<ContactForm
							subject="Courtesy Call Request"
							url="/api/submit"
							fields={[
								{
									type: "select",
									name: "subject",
									label: "Subject",
									required: true,
									options: [
										"Commodities",
										"Aviation",
										"Highways",
										"Retailers",
										"Shipping",
									],
									helpText: "You'll receive a report on the subject above.",
								},
								{
									type: "text",
									name: "name",
									label: "Your Name",
									required: true,
								},
								{
									type: "text",
									name: "companyName",
									label: "Company Name",
									required: true,
								},
								{
									type: "email",
									name: "email",
									label: "Email",
									required: true,
								},
								{ type: "phone", name: "phone", label: "Phone" },
								{
									type: "textarea",
									name: "message",
									label: "Tell us about you",
								},
							]}
						/>
					</Flow>
				</Grid.Col>
			</Grid>
		</Layout>
	);
};

export default CallPage;
