import { Database } from './schema';

export type CustomDatabase = {
    public: {
        [keys in keyof Database['public']]: keys extends 'Tables'
            ? {
                  [Table in keyof Database['public']['Tables']]: //             Row: Omit< //       ? { //   Table extends 'personas'
                  //                 Database['public']['Tables'][Table]['Row'],
                  //                 'details'
                  //             > & { details: persona_details_type };
                  //             Insert: Omit<
                  //                 Database['public']['Tables'][Table]['Insert'],
                  //                 'details'
                  //             > & {
                  //                 details: Partial<persona_details_type>;
                  //             };
                  //             Update: Omit<
                  //                 Database['public']['Tables'][Table]['Update'],
                  //                 'details'
                  //             > & {
                  //                 details?: Partial<persona_details_type>;
                  //             };
                  //             Relationships: Database['public']['Tables'][Table]['Relationships'];
                  //         }
                  //       :
                  Database['public']['Tables'][Table];
              }
            : Database['public'][keys];
    };
};

export type DatabaseTable = {
    [Table in keyof CustomDatabase['public']['Tables']]: CustomDatabase['public']['Tables'][Table]['Row'];
};
export type DatabaseTableInsert = {
    [Table in keyof CustomDatabase['public']['Tables']]: CustomDatabase['public']['Tables'][Table]['Insert'];
};
export type DatabaseTableUpdate = {
    [Table in keyof CustomDatabase['public']['Tables']]: CustomDatabase['public']['Tables'][Table]['Update'];
};

export type DatabaseEnums = CustomDatabase['public']['Enums'];
