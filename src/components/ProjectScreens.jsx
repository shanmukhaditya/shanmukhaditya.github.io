import { useState } from 'react';

export default function ProjectScreens({ screens }) {
    const [selected, setSelected] = useState(screens[0].id);
    const activeScreen = screens.find(screen => screen.id === selected);

    return (
        <figure className="app-screens">
            <div className="app-screens-stage">
                {screens.map(screen => (
                    <div className="app-phone" key={screen.id} data-active={screen.id === selected}>
                        <img
                            src={screen.image}
                            alt={screen.alt}
                            width="650"
                            height="1413"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                ))}
            </div>
            <figcaption className="app-screens-caption">
                <div className="app-screens-controls" role="group" aria-label="JustNutrition screens">
                    {screens.map(screen => (
                        <button
                            key={screen.id}
                            type="button"
                            aria-pressed={screen.id === selected}
                            onClick={() => setSelected(screen.id)}
                        >
                            {screen.label}
                        </button>
                    ))}
                </div>
                <p aria-live="polite">{activeScreen.caption}</p>
            </figcaption>
        </figure>
    );
}
