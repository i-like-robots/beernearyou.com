require 'rails_helper'

RSpec.describe Suggestion, :type => :model do

  describe 'validating a suggestion' do

    context 'without a name' do
      subject(:instance) { build(:suggestion, :with_url) }

      it 'fails validation' do
        expect(instance.valid?).to eq(false)
      end
    end

    context 'without a URL' do
      subject(:instance) { build(:suggestion, :with_name) }

      it 'fails validation' do
        expect(instance.valid?).to eq(false)
      end
    end

    context 'with a name and URL' do
      subject(:instance) { build(:suggestion, :with_name, :with_url) }

      it 'passes validation' do
        expect(instance.valid?).to eq(true)
      end
    end

  end

end
