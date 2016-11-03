defmodule PeapDemo.Repo.Migrations.CreateTodo do
  use Ecto.Migration

  def change do
    create table(:todos) do
      add :task, :string
      add :status, :string
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end
    create index(:todos, [:user_id])

  end
end
