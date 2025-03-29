# Web-Based Automated Loyalty System for Small Coffee Shops

## Overview
This project is a web-based automated loyalty system designed to help small coffee shops engage customers through a seamless and rewarding experience. The system enables users to earn and redeem points while providing business owners with insights into customer behavior.

## Features
- **User Authentication**: Secure login and registration.
- **Loyalty Points System**: Earn, track, and redeem points.
- **Transaction Management**: Record and view purchase history.
- **Admin Dashboard**: Monitor customer activity and manage rewards.
- **Security Measures**: Secure data storage and API protection.
- **Scalability**: Optimized for performance and future expansion.

## Technologies Used
- **Frontend**: React.js, Ant Design
- **Backend**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT-based authentication
- **Deployment**: Docker, Nginx

## Installation
### Prerequisites
- Node.js & npm
- MongoDB

### Backend Setup
```sh
npm install
npm run server
```

### Frontend Setup
```sh
cd frontend
npm install
npm start
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/users/login` | User authentication |
| `POST` | `/users/register` | User registration |
| `GET` | `/transactions` | Retrieve transaction history |
| `POST` | `/transactions/earn` | Add a new transaction |
| `POST` | `/transactions/redeem` | Redeem loyalty points |


## Future Improvements
- Integration with external POS systems
- Advanced analytics and reporting features

## Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue.

## Contact
For any questions, feel free to reach out:
- Email: bka05yu@gmail.com
- LinkedIn: https://www.linkedin.com/in/bek-yuldashev/
