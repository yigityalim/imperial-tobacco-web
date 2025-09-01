import type React from "react";

const bars = Array(12).fill(0);

export const Spinner = ({ size = 16 }) => {
	return (
		<div className="loading-parent">
			<div
				className="loading-wrapper"
				data-visible
				style={{ "--spinner-size": `${size}px` } as React.CSSProperties}
			>
				<div className="spinner">
					{bars.map((_, i) => (
						<div className="loading-bar" key={`spinner-bar-${i.toString()}`} />
					))}
				</div>
			</div>
		</div>
	);
};
