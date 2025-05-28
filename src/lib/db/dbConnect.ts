import mongoose from 'mongoose';

//URI de conexion a la base de datos de mongoDB
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Extiende el tipo global con las propiedades correctas
declare global {
  var mongooseConn: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

//Inicializamos el cache, pero verifica si ya existe una conexion
const cached = global.mongooseConn ?? (global.mongooseConn = { conn: null, promise: null });


//Funcion para conectar a la base de datos de mongoDB
async function dbConnect(): Promise<typeof mongoose> {
    if (cached.conn) {
      return cached.conn; // ya conectado, devuelve la conexión
    }
  
    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI); // inicia conexión si no se está conectando
    }
  
    cached.conn = await cached.promise; // espera la promesa y guarda la conexión
    return cached.conn;
  }
  

export default dbConnect;
