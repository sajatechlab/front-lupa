import { useId } from "react"

export function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: {
  width: number
  height: number
  x: string | number
  y: number
  squares: [number, number][]
} & React.SVGProps<SVGSVGElement>) {
  const patternId = useId()

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && squares.map(([x, y], index) => (
        <rect
          key={index}
          width={width / 3}
          height={height / 3}
          x={x * width + width / 6}
          y={y * height + height / 6}
          className="fill-primary/10 stroke-primary/50"
          strokeWidth={1}
        />
      ))}
    </svg>
  )
}