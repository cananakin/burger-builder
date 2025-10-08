import { useEffect, useState, type ComponentType } from "react";
import Modal from "../../components/UI/Modal/Modal";
import type { AxiosInstance, AxiosError } from "axios";

const withErrorHandler = <P extends object>(
    WrappedComponent: ComponentType<P>,
    axiosInstance: AxiosInstance
  ) => {
    const WithErrorHandler: React.FC<P> = (props) => {
        const [error, setError] = useState<AxiosError | null>(null);
    
        useEffect(() => {
            if (!axiosInstance) return;
            
            const reqIdRef: number = axiosInstance.interceptors.request.use((req) => {
                setError(null);
                return req;
            });
            
            const resIdRef: number = axiosInstance.interceptors.response.use(
                (res) => res, 
                (err: AxiosError) => {
                    setError(err);
                    return Promise.reject(err);
            });

            return () => {
                axiosInstance.interceptors.request.eject(reqIdRef);
                axiosInstance.interceptors.response.eject(resIdRef);
                
            };
        }, [axiosInstance]);

        const errorConfirmedHandler = () => setError(null);

        return (
            <>
                <Modal 
                    show={!!error}
                    modalClosed={errorConfirmedHandler}
                >
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </>
        );
    }
    WithErrorHandler.displayName = `withErrorHandler(${
        (WrappedComponent as any).displayName || WrappedComponent.name || "Component"
    })`;
    
    return WithErrorHandler;
}

export default withErrorHandler;