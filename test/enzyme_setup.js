import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

// Configure Enzyme for the appropriate React adapter
Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });
// Re-export all enzyme exports
export * from 'enzyme';
