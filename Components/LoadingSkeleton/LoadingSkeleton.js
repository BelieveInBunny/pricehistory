import React from 'react'
import ContentLoader from 'react-content-loader'


const LoadingSkeleton = props => {
    // Get values from props
    const { rows, columns, coverHeight, padding, speed } = props;
    let coverWidth = props.coverWidth

    // Hardcoded values
    coverWidth = coverWidth < 600 ? coverWidth / 1.1 : coverWidth / 4.2

    const coverHeightWithPadding = coverHeight + padding
    const coverWidthWithPadding = coverWidth + padding
    const initial = 35
    const covers = Array(columns * rows).fill(1)

    return (
        <ContentLoader
            speed={speed}
            width={columns * coverWidthWithPadding}
            height={rows * coverHeightWithPadding}
            primaryColor="#242b34"
            secondaryColor="#343d4c"
            {...props}
        >
            <rect
                x="0"
                y="0"
                rx="0"
                ry="0"
                width={columns * coverWidthWithPadding - padding}
                height="20"
            />

            {covers.map((g, i) => {
                let vy = Math.floor(i / columns) * coverHeightWithPadding + initial
                let vx = (i * coverWidthWithPadding) % (columns * coverWidthWithPadding)
                return (
                    <rect
                        key={i}
                        x={vx}
                        y={vy}
                        rx="0"
                        ry="0"
                        width={coverWidth}
                        height={coverHeight}
                    />
                )
            })}
        </ContentLoader>
    )
}

export default LoadingSkeleton;