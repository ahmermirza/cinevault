import { useState } from 'react';

function ColorChanger() {
    const [color, setColor] = useState('black');

    return (
        <>
            <div style={{ backgroundColor: color, width: '100%', height: '100vh' }}>
                <h1>Color Changer</h1>
                <button onClick={() => setColor("pink")} style={{ padding: '10px', margin: '10px', borderRadius: '15%', border: '1px solid black', backgroundColor: 'purple' }}>Pink</button>
                <button onClick={() => setColor("green")} style={{ padding: '10px', margin: '10px', borderRadius: '15%', border: '1px solid black', backgroundColor: 'purple' }}>Green</button>
                <button onClick={() => setColor("lightblue")} style={{ padding: '10px', margin: '10px', borderRadius: '15%', border: '1px solid black', backgroundColor: 'purple' }}>Blue</button>
                <button onClick={() => setColor("magenta")} style={{ padding: '10px', margin: '10px', borderRadius: '15%', border: '1px solid black', backgroundColor: 'purple' }}>Magenta</button>
            </div>
        </>
    )
}

export default ColorChanger;