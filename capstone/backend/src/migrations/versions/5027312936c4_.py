"""empty message

Revision ID: 5027312936c4
Revises: 444075b7d55e
Create Date: 2020-11-16 08:44:07.939037

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5027312936c4'
down_revision = '444075b7d55e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('articles', sa.Column('title', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('articles', 'title')
    # ### end Alembic commands ###
