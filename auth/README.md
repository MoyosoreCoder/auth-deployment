# Clone the repository
git clone https://github.com/CODECUBE-001/Co2.git

# Navigate to the auth folder
cd Co2/auth


# Install dependencies
npm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken cors
npm install --save-dev nodemon
run npm run dev
# Create a .env file and open it in a text editor (or use a terminal editor)
touch .env
nano .env  # (Or use 'vim .env' or any text editor)

# Add the following lines inside .env (manually)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

# Start the server
npm start
