const CustomLoader = () => {
	return (
		<div className="outer-loader">
			<div className="inner-loader">
				<div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
			</div>
		</div>
	);
};

export default CustomLoader;