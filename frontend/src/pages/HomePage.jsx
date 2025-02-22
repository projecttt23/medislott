import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      minHeight: '100vh', // Ensures the container takes at least the full viewport height
      backgroundColor: '#f4f4f9', // Background color for the entire page
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '20px' 
    }}>
      {/* Header Section with Flexbox */}
      <header style={{ 
        width: '100%', 
        maxWidth: '1200px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '40px', 
        padding: '20px', 
        backgroundColor: '#fff', 
        borderRadius: '10px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
      }}>
        {/* Platform Name */}
        <h1 style={{ color: '#2c3e50', fontSize: '2rem', margin: 0 }}>MediCare</h1>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link
            to="/doctor-list"
            style={{
              padding: '10px 20px',
              backgroundColor: '#3498db',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#2980b9';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#3498db';
              e.target.style.transform = 'scale(1)';
            }}
          >
            View List of Doctors
          </Link>
          <Link
            to="/form"
            style={{
              padding: '10px 20px',
              backgroundColor: '#2ecc71',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#27ae60';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#2ecc71';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Book Appointment
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '40px', 
        maxWidth: '800px', 
        width: '100%' 
      }}>
        <h2 style={{ color: '#2c3e50', fontSize: '2.5rem', marginBottom: '10px' }}>Your Gateway to Hassle-Free Doctor Consultations</h2>
        <p style={{ fontSize: '1.2rem', color: '#34495e' }}>
          Skip the wait, book now! Pre-book consultations with top doctors—online or offline.
        </p>
      </div>

      {/* About Section */}
      <div style={{ 
        maxWidth: '800px', 
        width: '100%', 
        textAlign: 'left', 
        backgroundColor: '#fff', 
        padding: '20px', 
        borderRadius: '10px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
      }}>
        <h2 style={{ color: '#2980b9', fontSize: '2rem', marginBottom: '20px' }}>About MediCare</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#34495e', marginBottom: '20px' }}>
          At MediCare, we believe that healthcare should be simple, accessible, and stress-free. Whether you're looking for an <strong>online consultation</strong> from the comfort of your home or an <strong>in-person visit</strong> to a trusted doctor, MediCare is here to make it happen. Say goodbye to long waiting lines and endless phone calls—book your appointments with just a few clicks!
        </p>

        <h3 style={{ color: '#2980b9', fontSize: '1.5rem', marginBottom: '10px' }}>Why Choose MediCare?</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', fontSize: '1.1rem', lineHeight: '1.6', color: '#34495e', marginBottom: '20px' }}>
          <li><strong>Wide Network of Doctors</strong>: Choose from a diverse pool of highly qualified doctors across various specialties.</li>
          <li><strong>Flexible Booking</strong>: Pre-book consultations at your convenience—online or offline.</li>
          <li><strong>Transparent Pricing</strong>: Know the consultation fees upfront—no hidden charges.</li>
          <li><strong>Real-Time Availability</strong>: Check doctor schedules and book time slots that work for you.</li>
          <li><strong>Seamless Experience</strong>: From booking to consultation, we’ve got you covered every step of the way.</li>
        </ul>

        <h3 style={{ color: '#2980b9', fontSize: '1.5rem', marginBottom: '10px' }}>How It Works</h3>
        <ol style={{ paddingLeft: '20px', fontSize: '1.1rem', lineHeight: '1.6', color: '#34495e', marginBottom: '20px' }}>
          <li><strong>Browse Doctors</strong>: Explore our list of doctors, filter by specialty, location, or availability.</li>
          <li><strong>Book Your Slot</strong>: Select a time slot that suits your schedule.</li>
          <li><strong>Consult with Ease</strong>: Attend your consultation online or visit the doctor’s clinic—your choice!</li>
          <li><strong>Stay Healthy</strong>: Receive personalized care and follow-up recommendations.</li>
        </ol>

        <h3 style={{ color: '#2980b9', fontSize: '1.5rem', marginBottom: '10px' }}>Join Thousands of Happy Users</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#34495e', marginBottom: '20px' }}>
          MediCare has helped thousands of users take control of their health. Whether it's a routine check-up, a specialist consultation, or urgent medical advice, we’re here to ensure you get the care you need, when you need it.
        </p>

        <h3 style={{ color: '#2980b9', fontSize: '1.5rem', marginBottom: '10px' }}>Your Health, Your Way</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#34495e' }}>
          With MediCare, healthcare is no longer a hassle. It’s simple, smart, and tailored to your needs. Start your journey to better health today!
        </p>
      </div>
    </div>
  );
};

export default HomePage;