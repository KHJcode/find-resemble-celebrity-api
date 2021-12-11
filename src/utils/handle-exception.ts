export const handleException = () => {
  return (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = async (...args: any[]) => {
      try {
        return await originalMethod.apply(this, args);
      } catch (error: any) {
        console.error(`[${originalMethod.name} ERROR]: ${error?.message}`);
        throw new Error(error);
      }
    };
  };
};
