import { ConnectedComponentClass } from 'react-redux';

class Child extends React.Component {
    foo () {}
}

const ConnectedChild = connect()(Child);

class Parent extends React.Component {
    private childRef: React.RefObject<ConnectedChild> = React.createRef()

    bar () {
        if (this.childRef.current) {
            this.childRef.current.foo();
        }
    }

    render () {
        return (
            <ConnectedChild ref={this.childRef} />
        );
    }
}