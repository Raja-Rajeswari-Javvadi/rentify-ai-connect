import React from 'react';
import { useNavigate } from 'react-router-dom';
type Property = {
  id: string;
  title: string;
  address: string;
  house_type: string;
  bedrooms: number;
  rent_per_month: number;
  has_water_facility: boolean;
  meter_type: string;
  is_available: boolean;
};

type PropertyListProps = {
  data: Property[];
  onUpdate: (property: Property) => void;
  onDelete: (id: string) => void;
};

const PropertyList: React.FC<PropertyListProps> = ({ data, onUpdate, onDelete }) => {
    const navigate = useNavigate();
  if (data.length === 0) {
    return <p>No houses found.</p>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Bedrooms</th>
            <th style={thStyle}>Rent/Month</th>
            <th style={thStyle}>Water Facility</th>
            <th style={thStyle}>Meter Type</th>
            <th style={thStyle}>Available</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((property) => (
            <tr key={property.id} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={tdStyle}>{property.title}</td>
              <td style={tdStyle}>{property.address}</td>
              <td style={tdStyle}>{property.house_type}</td>
              <td style={tdStyle}>{property.bedrooms}</td>
              <td style={tdStyle}>₹{property.rent_per_month}</td>
              <td style={tdStyle}>{property.has_water_facility ? 'Yes' : 'No'}</td>
              <td style={tdStyle}>{property.meter_type}</td>
              <td style={tdStyle}>{property.is_available ? 'Yes' : 'No'}</td>
              <td style={tdStyle}>
                <button
                  onClick={() => navigate(`/add-property?id=${property.id}`)}
                  style={buttonStyle('#007bff')}
                >
                  Update
                </button>
                <button
                  onClick={() => onDelete(property.id)}
                  style={buttonStyle('#dc3545')}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Reusable styles
const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px',
  borderBottom: '2px solid #ddd',
};

const tdStyle: React.CSSProperties = {
  padding: '10px',
  verticalAlign: 'top',
};

const buttonStyle = (bg: string): React.CSSProperties => ({
  marginRight: '0.5rem',
  padding: '5px 10px',
  backgroundColor: bg,
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
});

export default PropertyList;
