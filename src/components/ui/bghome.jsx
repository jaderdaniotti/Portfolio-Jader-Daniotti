import RippleGrid from '../RippleGrid';

export default function Background() {
    return (
        <div style={{position: 'absolute', height: '100vh', width: '100vw', overflow: 'hidden'}}>
  <RippleGrid
    enableRainbow={false}
    gridColor="#443C68"
    rippleIntensity={0.05}
    gridSize={30}
    gridThickness={15}
    mouseInteraction={true}
    mouseInteractionRadius={1.2}
            opacity={0.8}
        />
    </div>
    )
}