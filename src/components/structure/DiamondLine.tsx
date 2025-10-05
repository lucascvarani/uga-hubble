export default function DiamondLine() {
  return (
    <div style={{ width: '60%', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'white' }}></div>
        <div style={{ margin: '0 8px' }}>◆</div>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'white' }}></div>
      </div>
    </div>
  )
}
