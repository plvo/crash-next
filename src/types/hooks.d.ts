interface AnyObject {
  [key: string]: any;
}

type QueryKeyT = string[];

interface QueryHooksOptions<D> extends AnyObject {
  queryKey?: QueryKeyT;
  initialData?: D;
}

interface MutationHooksOptions<V> extends AnyObject {
  invalidateQueries?: QueryKeyT[];
  onSuccess?: (res: unknown, variables: V) => void;
  onError?: (error: unknown) => void;
}
