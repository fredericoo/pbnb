import { gql } from "@apollo/client";

export const menuQuery = gql`
	{
		allHomes {
			edges {
				node {
					body {
						__typename
						... on HomeBodyMenu {
							type
							fields {
								label
								link {
									__typename
									... on _ExternalLink {
										url
										target
									}
									... on Page {
										title
										_meta {
											uid
											alternateLanguages {
												id
											}
										}
									}
								}
							}
						}
						... on HomeBodyCall_to_action {
							type
							fields {
								label
								link {
									__typename
									... on _ExternalLink {
										url
										target
									}
									... on Page {
										title
										_meta {
											uid
											alternateLanguages {
												id
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

export default menuQuery;
