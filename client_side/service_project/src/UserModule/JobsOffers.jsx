import React from 'react'
import plumber from '../assets/plumber.jpg'
import electrician from '../assets/electrician.jpg'
import welder from '../assets/welder.jpg'


function JobsOffers() {
    const styles = {
        container: {
          display: "flex",
          gap: "20px",
          overflowX: "hidden", // Enables horizontal scrolling
          padding: "20px",
          backgroundColor: "#f4f4f9",
          scrollSnapType: "x mandatory", // Smooth scrolling for snapping cards into view
        },
        card: {
          flex: "0 0 auto", // Prevents cards from shrinking or growing
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "250px",
          textAlign: "center",
          padding: "20px",
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          scrollSnapAlign: "center", // Aligns each card to the center while scrolling
        },
        cardHover: {
          transform: "scale(1.05)", // Enlarges card slightly on hover
          boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
        },
        image: {
          width: "100%",
          borderRadius: "10px",
        },
        title: {
          margin: "15px 0 10px",
          fontSize: "1.5rem",
          color: "#333",
        },
        
      };
      const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = styles.cardHover.transform;
        e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
      };
    
      const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = styles.card.boxShadow;
      };
    
  return (
    <div style={styles.container}>
    <div
      style={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={plumber} alt="Plumber" style={styles.image} />
      <h3 style={styles.title}>Plumber</h3>
    </div>
    <div
      style={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={electrician} alt="Electrician" style={styles.image} />
      <h3 style={styles.title}>Electrician</h3>
    </div>
    <div
      style={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={welder} alt="Welder" style={styles.image} />
      <h3 style={styles.title}>Welder</h3>
    </div>
    <div
      style={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={plumber} alt="Plumber" style={styles.image} />
      <h3 style={styles.title}>Plumber</h3>
    </div>
    <div
      style={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={electrician} alt="Electrician" style={styles.image} />
      <h3 style={styles.title}>Electrician</h3>
    </div>
    <div
      style={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={welder} alt="Welder" style={styles.image} />
      <h3 style={styles.title}>Welder</h3>
    </div>
    <div
      style={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={plumber} alt="Plumber" style={styles.image} />
      <h3 style={styles.title}>Plumber</h3>
    </div>
    <div
      style={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={electrician} alt="Electrician" style={styles.image} />
      <h3 style={styles.title}>Electrician</h3>
    </div>
    <div
      style={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={welder} alt="Welder" style={styles.image} />
      <h3 style={styles.title}>Welder</h3>
    </div>
    <div
      style={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={electrician} alt="Electrician" style={styles.image} />
      <h3 style={styles.title}>Electrician</h3>
    </div>
  </div>
  )
}

export default JobsOffers