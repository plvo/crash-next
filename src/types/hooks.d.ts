interface AnyObject {
  [key: string]: any;
}

type QueryKeyT = string[];

interface QueryHooksOptions<D> extends AnyObject {
  id: string;
  queryKey?: QueryKeyT;
  initialData?: D;
}

interface MutationHooksOptions<V> extends AnyObject {
  invalidateQueries: QueryKeyT[];
  onSuccess?: (data: unknown, variables: V) => void;
  onError?: (error: unknown) => void;
}
