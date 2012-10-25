module Kart {
    export module Core {
        export interface ICallback {
            (...args: any[]): void;
        }

        export interface ITraversable {
            get ( path    : string ): any;
            set ( updates : Object ): ITraversable;
        }

        export interface IObservable {
            bind    ( event_name : string, callback : ICallback ): IObservable;
            unbind  ( event_name : string, callback : ICallback ): IObservable;
            trigger ( event_name : string, ...args  : any[]     ): IObservable;
        }
   }
}