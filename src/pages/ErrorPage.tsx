import "../styles/pages/ErrorPage.scss";

export default function ErrorPage({ text }: { text?: string }) {

	return (
		<>
			<div className="not-found-page">
				<div className="content">
					<div className="text">
						<div className="title">Oops...</div>
						<div className="description">
							{text ? text : "There was an error loading this page..."}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
