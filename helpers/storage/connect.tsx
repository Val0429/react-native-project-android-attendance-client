import React, { Component } from 'react';
import { Storage } from './storage';
import { Subscription } from 'rxjs';


type ExtractS<T> = T extends Storage<infer U> ? U : never;
type ExtractC<T> = T extends Component<infer K, infer U> ? K : T;

export function Connect<T extends Storage<any>, K extends keyof ExtractS<T>>(storage: T, ...keys: K[]) {
    return function<U extends Component>(Class: { new (...args): U } ): { new (...args): U } {
        let o = class extends Component< ExtractC<U> > {
            private subscription: Subscription;
            constructor(props) {
                super(props);
                this.state = {};
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
                    <Class {...this.props} {...this.state} />
                );
            }
        }
        return o as any;
    }
}
