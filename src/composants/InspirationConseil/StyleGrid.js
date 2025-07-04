import React, { useState } from 'react';
import '../../css/InspirationConseil/StyleGrid.css';

const styles = [
  {
    nom: 'Bohème',
    image: "/images/InspirationConseil/styles/boheme.jpg",
    description:
      "Un art de vivre libre et instinctif, où les matières brutes, les étoffes naturelles et les pièces artisanales se rencontrent dans une harmonie chaleureuse. Le style bohème célèbre l’imperfection élégante, les souvenirs de voyage, et le confort d’un intérieur vécu.",
  },
  {
    nom: 'Scandinave',
    image: "/images/InspirationConseil/styles/scandinave.jpg",
    description:
      "Simplicité lumineuse et raffinement discret. Le style scandinave marie le bois clair, les teintes douces et les formes épurées pour créer un équilibre apaisant. Une ode à la fonctionnalité noble et à la lumière naturelle.",
  },
  {
    nom: 'Minimaliste',
    image: "/images/InspirationConseil/styles/minimaliste.jpg",
    description:
      "Pureté, silence et maîtrise de l’espace. Le style minimaliste cultive l’essentiel avec rigueur et grâce. Chaque détail est intentionnel, chaque vide permet à l’élégance de respirer.",
  },
  {
    nom: 'Moderne',
    image: "/images/InspirationConseil/styles/moderne.jpg",
    description:
      "Une esthétique affirmée, audacieuse et précise. Volumes épurés, matières nobles et contrastes marqués définissent un intérieur contemporain, pensé pour une sophistication silencieuse.",
  },
  {
    nom: 'Classique',
    image: "/images/InspirationConseil/styles/classique.jpg",
    description:
      "Héritier des grandes demeures européennes, le style classique se distingue par son équilibre, ses moulures délicates, ses meubles aux lignes nobles et ses matériaux durables. Une élégance intemporelle au goût sûr.",
  },
  {
    nom: 'Art déco',
    image: "/images/InspirationConseil/styles/artdeco.jpg",
    description:
      "Géométrie précieuse, laiton, marbre et velours s’unissent dans une symphonie sophistiquée. Le style Art déco évoque la grandeur des années 1920 avec une touche résolument contemporaine.",
  },
  {
    nom: 'Japandi',
    image: "/images/InspirationConseil/styles/japandi.jpg",
    description:
      "Alliance du minimalisme japonais et de la chaleur scandinave. Japandi privilégie les matières naturelles, les lignes basses et les tons terreux pour une sérénité élégante, ancrée dans la simplicité et l’art de vivre.",
  },
  {
    nom: 'Méditerranéen',
    image: "/images/InspirationConseil/styles/mediterraneen.jpg",
    description:
      "Pierre blanche, bois patiné, textiles en lin, et lumière éclatante composent ce style solaire et apaisant. Le style méditerranéen évoque les demeures de bord de mer, entre tradition artisanale et décontraction élégante.",
  },
];


export default function StyleGrid() {
  const [index, setIndex] = useState(0);
  const total = styles.length;

  const previous = () => setIndex((prev) => Math.max(0, prev - 1));
  const next = () => setIndex((prev) => Math.min(total - 1, prev + 1));

  return (
    <section className="style-carousel">
      <h2 className="style-section-title">Styles en vogue</h2>

      <div className="style-slider-wrapper">
        <div
          className="style-slider"
          style={{
            transform: `translateX(-${index * 100}%)`,
          }}
        >
          {styles.map((style, i) => (
            <div className="style-card" key={i}>
              <div className="style-image">
                <img src={style.image} alt={style.nom} />
              </div>
              <div className="style-text">
                <h2>{style.nom}</h2>
                <p>{style.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="style-navigation-right">
        <button
          onClick={previous}
          style={{ visibility: index === 0 ? 'hidden' : 'visible' }}
        >
          &larr;
        </button>
        <span>{index + 1} / {total}</span>
        <button
          onClick={next}
          style={{ visibility: index === total - 1 ? 'hidden' : 'visible' }}
        >
          &rarr;
        </button>
      </div>
    </section>
  );
}
