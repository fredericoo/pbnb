import Layout from "components/Layout/Layout";
import Meta from "components/Meta/Meta";
import Grid from "components/Grid/Grid";
import ContactForm from "components/ContactForm/ContactForm";

const CallPage = () => {
	return (
		<Layout>
			<Meta />
			<Grid>
				<Grid.Col className="py-3">
					<h1 className="h-2">Book a Courtesy Call</h1>
				</Grid.Col>
				<Grid.Col>
					<ContactForm
						subject="Courtesy Call Request"
						url="/api/submit"
						fields={[
							{ type: "text", name: "name", label: "Name" },
							{ type: "textarea", name: "message", label: "Message" },
						]}
					/>
				</Grid.Col>
			</Grid>
		</Layout>
	);
};

export default CallPage;
