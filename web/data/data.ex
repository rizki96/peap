defmodule PeapDemo.Data do

  alias PeapDemo.Data.Api
  alias PeapDemo.User
  alias PeapDemo.Todo

  def schema do
    %GraphQL.Schema{
      query: %GraphQL.Type.ObjectType{
        name: "RootQueryType",
        fields: %{
          whoami: %{
            description: "Who am I?",
            args: %{},
            resolve: {Api, :whoami},
            type: %GraphQL.Type.ObjectType{
              name: "User",
              description: "A User",
              fields: %{
                id: %{type: %GraphQL.Type.Int{}},
                name: %{type: %GraphQL.Type.String{}},
                email: %{type: %GraphQL.Type.String{}}
              }
            }
          },
          get_todos: %{
            description: "My Todo List",
            args: %{},
            resolve: {Api, :get_todos},
            type: %GraphQL.Type.List{
              ofType: %GraphQL.Type.ObjectType{
                name: "Todo",
                description: "My Todo List",
                fields: %{
                  id: %{type: %GraphQL.Type.Int{}},
                  task: %{type: %GraphQL.Type.String{}},
                  status: %{type: %GraphQL.Type.String{}}
                }
              }
            }
          }
        }
      },
      mutation: %GraphQL.Type.ObjectType{
        name: "Mutation",
        fields: %{
          increment: %{
            description: "Increment the counter",
            args: %{by: %{ type: %GraphQL.Type.Int{} }},
            resolve: {Api, :increment_counter},
            type: %GraphQL.Type.ObjectType{
              name: "NumberHolder",
              fields: %{
                current_value: %{type: %GraphQL.Type.Int{}}
              }
            }
          },
          add_todo: %{
            description: "Add one Todo",
            args: %{task: %{type: %GraphQL.Type.String{}}, 
                    status: %{type: %GraphQL.Type.String{}}},
            resolve: {Api, :add_todo},
            type: %GraphQL.Type.ObjectType{
              name: "AddedTodoHolder",
              fields: %{
                id: %{type: %GraphQL.Type.Int{}},
                task: %{type: %GraphQL.Type.String{}},
                status: %{type: %GraphQL.Type.String{}}
              }
            }
          },
          remove_todo: %{
            description: "Remove one Todo",
            args: %{todo_id: %{type: %GraphQL.Type.Int{}}},
            resolve: {Api, :remove_todo},
            type: %GraphQL.Type.ObjectType{
              name: "RemovedTodoHolder",
              fields: %{
                id: %{type: %GraphQL.Type.Int{}},
                task: %{type: %GraphQL.Type.String{}},
                status: %{type: %GraphQL.Type.String{}}
              }
            }
          },
          update_todo: %{
            description: "Update one Todo",
            args: %{
              todo_id: %{type: %GraphQL.Type.Int{}},
              status: %{type: %GraphQL.Type.String{}}
            },
            resolve: {Api, :update_todo},
            type: %GraphQL.Type.ObjectType{
              name: "UpdatedTodoHolder",
              fields: %{
                id: %{type: %GraphQL.Type.Int{}},
                task: %{type: %GraphQL.Type.String{}},
                status: %{type: %GraphQL.Type.String{}}
              }
            }
          }
        }
      }
    }
  end

  def root_value(conn = %Plug.Conn{}) do
    user = Guardian.Plug.current_resource(conn)
    root_value(user)
  end

  def root_value(user = %User{}) do
    %{ user: user }
  end

  def execute(query, conn = %Plug.Conn{}) do
    execute(query, root_value(conn))
  end

  def execute(query, user = %User{}) do
    execute(query, root_value(user))
  end

  def execute(query, root_value) do
    GraphQL.execute(
      schema,
      query,
      root_value
    )
  end

end
