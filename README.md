# HAIRGO

Hairgo is an original idea to set up an online hairdressing service.
Functionally similar to YANGO, we aim to allow hairdressers to be called for their services, either at home or in a salon.

Through our application, we want to enable our users to get their hair done as soon as the need arises. For instance: Mr. Konan needs to attend a meeting at 10 PM, and it is currently 8 PM. He needs 30 minutes to get his hair done. He can call on our service and have his hair styled in time.

## Application Structure

The app will have two main parts:
- Frontend
- Backend

## Features

1. Register hairdressers
2. Register hairstyles
3. Register salons
4. Enable client location tracking
5. Allow clients to choose their desired hairdressers and hairstyles

## Hairdresser Registration

Hairdressers are selected by the service administrators. Once selected for a transaction, a hairdresser becomes unavailable for any other transaction until the current one is completed.

Hairdressers recharge their balance at our various physical locations (cash). We then provide them with an electronic balance for participating in selections. The profits are shared between the hairdressers and administrators. When a hairdresser is selected for a potential styling job, the service fee is deducted from their balance as a reservation. Once the styling job is completed and payment is received, the amount is officially deducted from their overall balance.

## Frontend Screens

The various screens to be designed for the application include:
1. Login screen
2. Hairdresser registration screen
3. Client registration screen
4. Client homepage, including a map display
5. Hairdresser homepage

The design will be handled by the frontend developer.

## Detailed Description of Key Elements for the First Version

The Hairgo project enables individuals who want to get their hair styled to place requests via the app.

### Service Components

1. Mobile App (ANDROID) – for clients and potential hairdressers
2. Admin Panel – to fully manage the service (validate, reject, insert, delete, confirm updates, etc.)

### Mobile App for Hairdressers

Hairdressers initiate a registration request by providing:
- Full name
- Profession
- Residential address
- Date of birth
- ID card
- A photo
- Whether they own a salon
- Potential hairstyles they can perform
- Educational level

#### Hairdresser Dashboard

Once registered, hairdressers have a unique dashboard view different from that of a client, including:
- Recharged balance (automatically updated)
- Status (active or inactive) toggle
- Visibility of hairdressing requests
- Estimated styling time
- Option to confirm or reject assigned jobs
- Visibility of earnings from completed jobs

#### Hairdresser Workflow

A specific styling duration is assigned to each hairdresser. Once selected by a client and upon acceptance, the timer starts. When the timer ends, the hairdresser becomes available for a new job. Extensions can be requested and must be approved by the administrator.

Hairdressers are prioritized for clients in the same geographical area. If a job is completed early, the hairdresser can stop the timer and mark themselves as available.

#### Key Features for Hairdresser Operations

- Each job deducts either 3,000 XOF or 5,000 XOF from the hairdresser’s balance.
- Hairdressers are rated by clients; top-rated hairdressers will be rewarded.

#### Details for Each Job

Visible to both hairdresser and client:
- Styling time
- Total cost
- Hairdresser contact
- Client contact
- Styling location
- Hairstyle requested

#### Validation of Jobs

Hairdressers can approve or reject assigned jobs. Upon job completion, the corresponding amount is deducted from their prepaid balance. The service operates on a prepaid basis.

#### Pricing Structure

| Service Type   | Pricing (XOF) |
|----------------|---------------|
| Reservation    | 3,000         |
| Home Service   | 5,000         |

Hairdressers recharge their balance with cash at designated locations or via wallet/bank account. Administrators credit the balance, and fees are deducted for each service provided.

### Mobile App for Clients

Clients can get their hair done at home or in validated salons.

#### Home Services

Home services are more expensive due to travel expenses and additional charges.

#### Client Registration Options

Clients can either:
1. Register by providing details like name, address, and phone number.
2. Use the service without registering by providing necessary details for the requested service.

#### Client Dashboard Features

- List of available hairdressers
- List of available hairstyles
- Google Maps integration for location selection
- Pricing details
- Appointment time selection

#### Job Details

Visible to clients:
- Hairdresser contact
- Timing
- Price

## Administrative Management

The admin panel allows complete service management including:
- Validating hairdresser registration requests
- Activating/deactivating hairdressers
- Approving hairdresser recharges
- Updating profiles
- Registering hairstyles and hairdressers
- Managing client complaints

## Technical Challenges

1. Automatically locating a client
2. Displaying available hairdressers in the client’s area
3. Notifications:
   - Job acceptance notifications for clients
   - Hairstyle rating notifications for clients
   - Recharge notifications for hairdressers
   - Service fee deduction notifications

## Incentives

We plan to incentivize hairdressers for recharges, offering bonuses for larger amounts.

## Architecture

Le projet est composé de deux parties principales :

### Frontend (React Native)
L'application mobile permet aux utilisateurs d'interagir avec l'application.

### Backend (Node.js/Express)
L'API REST qui gère les données et la logique métier.

## Stockage

Le projet utilise un NAS Synology pour le stockage des données médias :
- Images des utilisateurs
- Photos des barbiers
- Documents associés

Le chemin de montage du NAS est configuré dans le fichier `.env` :
```bash
SYNOLOGY_STORAGE=/Volumes/HairGo/uploads
SYNOLOGY_HOST=198.168.1.10
SYNOLOGY_USER=kassi
SYNOLOGY_PASSWORD=6Y8R'uLs
```

## How to Launch the Project

### Prerequisites

- Node.js and npm installed
- React Native CLI or Expo CLI installed
- Android Studio or Xcode installed for emulators (optional)
- Backend server dependencies installed

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/HairGoApp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React Native app:
   - For Expo:
     ```bash
     expo start
     ```
   - For React Native CLI (Android):
     ```bash
     npx react-native run-android
     ```
   - For React Native CLI (iOS):
     ```bash
     npx react-native run-ios
     ```

### Notes

- Make sure the backend server is running before starting the frontend app.
- For physical devices, connect them to the same network as your development machine.
- If using Expo, you can scan the QR code with the Expo Go app.

---

This README provides an overview of the Hairgo project, its features, and key components for the initial version.
