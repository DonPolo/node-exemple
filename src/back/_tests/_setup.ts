import dbMock from './_mocks/db.mock';
import fs from 'fs';

if (fs.existsSync('DB/response_test')) {
  fs.unlinkSync('DB/response_test');
}
if (fs.existsSync('DB/contexts_test')) {
  fs.unlinkSync('DB/contexts_test');
}
if (fs.existsSync('DB/analytics_test')) {
  fs.unlinkSync('DB/analytics_test');
}

// Mock the different NeDB databases
dbMock.mockAnalyticsDb();
dbMock.mockContextDb();
dbMock.mockResponseDb();

// Empty the response database
dbMock.emptyResponseDb();
