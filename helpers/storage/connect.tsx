import { Component } from 'react';
import { Storage } from './storage';
import { Subscription } from 'rxjs';

function Connect<T extends Storage<any>, K extends keyof ExtractS<T>>(storage: T, ...keys: K[]) {
    return function<U extends Component>(Class: { new (...args): U } ) {
        return class extends Component< ExtractC<U> > {
            private subscription: Subscription;
            constructor(props) {
                super(props);
            }
            componentDidMount() {
                this.subscription = storage.getObservable(...(keys as any))
                    .subscribe( (data) => this.setState(data));
            }
            componentWillUnmount() {
                this.subscription && this.subscription.unsubscribe();
            }
            render() {
                return (
                    <Class {...this.state} />
                );
            }
        }
    }
}
type ExtractS<T> = T extends Storage<infer U> ? U : never;
type ExtractC<T> = T extends Component<infer K, infer U> ? K : T;
