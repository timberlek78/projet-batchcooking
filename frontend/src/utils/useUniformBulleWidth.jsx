import { useEffect, useRef } from 'react';

export function useUniformBulleWidth(deps = []) {
	const containerRef = useRef(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const container = containerRef.current;

		const compute = () => {
			const bulles = container.querySelectorAll('#bulle');
			
			const rootFontSize = parseFloat(
				getComputedStyle(document.documentElement).fontSize
			);
			
			let maxWidthPx = 8 * rootFontSize;

			bulles.forEach(bulle => {
				bulle.style.width = 'max-content';
			});

			bulles.forEach(bulle => {
				maxWidthPx = Math.max(maxWidthPx, bulle.offsetWidth);
			});

			const maxWidthRem = maxWidthPx / rootFontSize;
			
			container.style.setProperty(
				'--bulle-w',
				`${maxWidthRem}rem`
			);

			bulles.forEach(bulle => {
				bulle.style.width = 'var(--bulle-w)';
			});
		};

		const observer = new ResizeObserver(compute);

		observer.observe(container);
		container.querySelectorAll('.bulleText').forEach(bulle =>
			observer.observe(bulle)
		);

		compute();

		return () => observer.disconnect();
	}, deps);

	return containerRef;
}

