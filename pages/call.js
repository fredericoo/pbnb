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
						src="https://images.prismic.io/pbnb/7b672782-6b1d-4d96-929f-40bc98c62724_call.png?auto=compress,format"
						width={1578}
						height={1047}
						layout="responsive"
					/>
				</Grid.Col>
				<Grid.Col md="col-7 / grid-end">
					<Flow spacing="2rem">
						<header>
							<h1 className="h-2">Book a Courtesy Call</h1>
							<div className="body l-2 s-sm">
								<p>
									Find the best date and time for a Courtesy Call and we will
									reach out to you with a confirmation.
								</p>
							</div>
						</header>
						<ContactForm
							subject="Courtesy Call Request"
							url="/api/submit"
							fields={[
								{
									type: "date",
									name: "preferredDate",
									label: "Preferred date",
									required: true,
									helpText:
										"Selecting a date does not guarantee you a slot. You will receive confirmation from one of our team members beforehand.",
								},
								{
									type: "select",
									name: "timeOfDay",
									label: "Time of day",
									required: true,
									options: ["Morning", "Afternoon"],
								},
								{
									type: "text",
									name: "name",
									label: "Name",
									required: true,
								},
								{
									type: "email",
									name: "email",
									label: "Email",
									required: true,
								},
								{
									type: "phone",
									name: "phone",
									label: "Phone",
									required: true,
								},
								{
									required: true,
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
