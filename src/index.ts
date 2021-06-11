import App from './server/App'
import SocketHandler from './server/SocketHandler'

SocketHandler

App.httpServer.listen(App.express.get('port'), () => {
  console.log(`Server running on port ${App.express.get('port')}`);
});