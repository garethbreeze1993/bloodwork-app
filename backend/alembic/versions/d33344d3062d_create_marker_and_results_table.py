"""Create Marker and Results Table

Revision ID: d33344d3062d
Revises: dc5fcf614f95
Create Date: 2023-03-25 06:18:15.966692

"""
import csv
from typing import List
from alembic import op
import sqlalchemy as sa
from app.config import settings



# revision identifiers, used by Alembic.
revision = 'd33344d3062d'
down_revision = 'dc5fcf614f95'
branch_labels = None
depends_on = None

markers_table = 'markers'
results_table = 'results'


# def parse_marker_csv() -> List[dict]:
#     """From a CSV make a list of dicts for bulk insert of marker data"""
#
#     bulk_data = []
#     with open(settings.marker_data_file) as csv_file:
#         reader = csv.DictReader(csv_file)
#
#         for r in reader:
#             bulk_data.append(r)
#
#     return bulk_data



def upgrade() -> None:
    alembic_marker_table = op.create_table(markers_table,
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(), nullable=False),
                    sa.Column('unit_measurement', sa.String(), nullable=False),
                    sa.Column('below_standard_lower', sa.DECIMAL(scale=2, asdecimal=True), nullable=False),
                    sa.Column('below_standard_upper', sa.DECIMAL(scale=2, asdecimal=True), nullable=False),
                    sa.Column('optimal_lower', sa.DECIMAL(scale=2, asdecimal=True), nullable=False),
                    sa.Column('optimal_upper', sa.DECIMAL(scale=2, asdecimal=True), nullable=False),
                    sa.Column('above_standard_lower', sa.DECIMAL(scale=2, asdecimal=True), nullable=False),
                    sa.Column('above_standard_upper', sa.DECIMAL(scale=2, asdecimal=True), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('name'))

    op.create_table(results_table,
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('marker_id', sa.Integer(), nullable=False),
                    sa.Column('value', sa.DECIMAL(scale=2, asdecimal=True), nullable=False),
                    sa.Column('date', sa.Date(), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    )

    op.create_foreign_key(constraint_name='results_user_id_fkey', source_table=results_table,
                          referent_table='users', local_cols=['user_id'], remote_cols=['id'])
    op.create_foreign_key(constraint_name='results_marker_id_fkey', source_table=results_table,
                          referent_table=markers_table, local_cols=['marker_id'], remote_cols=['id'])

    # bulk_upload_data = parse_marker_csv()
    #
    # op.bulk_insert(alembic_marker_table, bulk_upload_data)


def downgrade() -> None:
    op.drop_constraint(constraint_name='results_marker_id_fkey', table_name=results_table, type_='foreignkey')
    op.drop_constraint(constraint_name='results_user_id_fkey', table_name=results_table, type_='foreignkey')
    op.drop_table(results_table)
    op.drop_table(markers_table)
